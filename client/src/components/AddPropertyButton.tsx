import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { MouseEventHandler, VFC } from 'react';

type Props = {
  onClick: MouseEventHandler;
};

const AddPropertyButton: VFC<Props> = ({ onClick }) => (
  <div className="add-property">
    <Fab aria-label="Add property" color="primary" onClick={onClick}>
      <Add />
    </Fab>
  </div>
);

export { AddPropertyButton };
