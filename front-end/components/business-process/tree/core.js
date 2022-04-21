import React, {useEffect} from 'react';
import BPTreeComponent from './tree-view';
import {BPColors} from '../../../utils/business-process/standards';
import BPTreeFilterComponent from './tree-filter';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../../../utils/business-process/launchpad/core';

const BPTreeView = ({
  onChange,
}) => {
  const {
    data,
    setParam,
  } = useLPSession(BPLaunchpad.tree.getMap());

  useEffect(() => {
    console.log('BPTreeView: useEffect', data);
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPTreeFilterComponent
        onChange={(filter) => {
          setParam(filter);
        }}
      />

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Map Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTreeComponent data={data} onChange={(log) => {
          if (onChange && log) {
            onChange(log.id); // TODO: Will be changed based on the property name in API.
          }
        }}/>
      </div>
    </div>
  );
};

export default BPTreeView;
