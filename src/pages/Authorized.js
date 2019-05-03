import React from 'react';
import { Authorized as RenderAuthorized } from 'ant-design-pro';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authorized>
);
