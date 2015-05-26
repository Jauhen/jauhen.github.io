import React from 'react';
import Dashboard from './components/dashboard/Dashboard';

window.React = React;
const mountNode = document.getElementById('app');

React.render(<Dashboard/>, mountNode);
