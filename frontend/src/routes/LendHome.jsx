import React, { useCallback, useContext, useState } from 'react';

import '../styles/LendHome.scss';

import ToolList from 'components/ToolList';
import Navigation from 'components/NavigationBar';
import CreateToolForm from 'components/CreateToolForm';

const LendHome = (props) => {
  return (
    <div className="lend-home">
      < Navigation />
      < CreateToolForm />
    </div >
  );
};

export default LendHome;
