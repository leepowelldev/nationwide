import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { MouseEventHandler, VFC } from 'react';

type Props = {
  onClick: MouseEventHandler;
};

const AddPropertyButton: VFC<Props> = ({ onClick }) => (
  <div className="add-property">
    <Fab color="primary" onClick={onClick}>
      <Add />
      <div className="sr-only">Add property</div>
    </Fab>
  </div>
);

export { AddPropertyButton };
