import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from '@material-ui/core'
import {
  ShoppingCartOutlined, SportsEsportsOutlined,
} from '@material-ui/icons'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import UserCenter from '../components/user-center'
import FriendList from '../components/friend-list'
import Store from '../components/store'
import Library from '../components/library'
import Analytics from '../components/analytics'
import GameDetails from '../components/game-details'

interface LeftColumnButtonProps {
  text: string
  isSelected: boolean
  onClick: React.MouseEventHandler
  children: React.ReactChild
}

const LeftColumnButton = ({
  text, isSelected, onClick, children,
}: LeftColumnButtonProps) => (
  <button
    className={`transition-enabled mx-4 flex space-x-2 p-2 pl-8 rounded-full items-center focus:outline-none ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
    type="button"
    onClick={onClick}
  >
    <div className={`transition-enabled ${isSelected ? 'text-red-400' : 'text-gray-600'}`}>
      {children}
    </div>
    <div className={`transition-enabled text-lg ${isSelected ? 'text-red-400' : 'text-gray-600'}`}>
      {text}
    </div>
  </button>
)

export interface OpenGameDetails {
  // eslint-disable-next-line no-unused-vars
  (gameId: number): void
}

type Subpage = 'Store' | 'Library' | 'Analytics'

const subpages: Array<{ name: Subpage, icon: React.ReactChild }> = [
  { name: 'Store', icon: <ShoppingCartOutlined /> },
  { name: 'Library', icon: <SportsEsportsOutlined /> },
  // { name: 'Analytics', icon: <InsertChartOutlined /> },
]

export interface Region {
  id: number
  currency: string
  flag: string
}

export default function Index() {
  const router = useRouter()

  const [selectedPage, setSelectedPage] = useState<Subpage | 'Game Details'>('Store')
  const [gameId, setGameId] = useState(0)
  const [lastSelectedPage, setLastSelectedPage] = useState<Subpage>('Store')

  const [region, setRegion] = useState(38)
  const [regions, setRegions] = useState<Array<Region>>([])

  useEffect(() => {
    if (Cookies.get('region') === undefined) Cookies.set('region', `${region}`)
    else setRegion(parseInt(Cookies.get('region') as string, 10))
  }, [])

  useEffect(() => {
    const getRegions = async () => {
      const res = await axios.get<Array<Region>>(
        '/api/get-regions',
      )
      setRegions(res.data)
    }
    getRegions()
  }, [])

  const openGameDetails: OpenGameDetails = (gameId: number) => {
    setGameId(gameId)
    setLastSelectedPage(selectedPage as Subpage)
    setSelectedPage('Game Details')
  }

  const closeGameDetails = () => {
    setSelectedPage(lastSelectedPage)
  }

  return (
    <div>
      <div className="fixed bg-gray-50 w-screen h-screen" style={{ zIndex: -1 }} />
      <div className="py-4">
        <div className="flex max-w-screen-xl mx-auto items-start">
          <div className="fixed flex-none w-48 bg-white rounded-md shadow-lg flex flex-col space-y-4 py-4">
            <img className="scale-150" src="./assets/logo-clipped.png" />
            {subpages.map((value) => (
              <LeftColumnButton text={value.name} isSelected={selectedPage === value.name} onClick={() => { setSelectedPage(value.name) }}>
                {value.icon}
              </LeftColumnButton>
            ))}
          </div>
          <div className="flex-none w-48 h-48" />
          <div className="flex-grow bg-white rounded-md shadow-lg mx-4">
            {selectedPage === 'Store' ? <Store openGameDetails={openGameDetails} />
              : (selectedPage === 'Library' ? <Library />
                : (selectedPage === 'Analytics' ? <Analytics /> : <GameDetails gameId={gameId} closeGameDetails={closeGameDetails} />))}
          </div>
          <div className="flex-none w-64 space-y-4">
            <div className="p-2 bg-white rounded-md shadow-md">
              <Select
                className="w-full"
                value={region}
                onChange={(e) => {
                  Cookies.set('region', `${e.target.value}`)
                  router.reload()
                }}
              >
                {regions.map((value) => (
                  <MenuItem value={value.id}>
                    <div className="flex flex-row px-2">
                      <iframe title={value.currency} src={value.flag} width={30} height={20} />
                      <div>
                        {value.currency}
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <UserCenter />
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  )
}
