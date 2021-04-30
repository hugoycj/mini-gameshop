import { withStyles, createStyles, LinearProgress } from '@material-ui/core'

const BorderLinearProgress = withStyles((theme) => createStyles({
  root: {
    height: 8,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
}))(LinearProgress)

export default BorderLinearProgress
