import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import moment from 'moment';
import { app } from '@/setting';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: app.uri,
    blankTarget: true,
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: `${app.uri}/terminos`,
    blankTarget: true,
  },
  {
    key: 'version',
    title: `Version: ${app.version}`,
    href: app.uri,
    blankTarget: true,
  },
];

const copyright = (
  <Fragment>
      Copyright <Icon type="copyright" /> {moment().year()}{' '}
      <a href={app.authorUri} target="_blacnk">{app.author}</a>
  </Fragment>
);

const UserLayout = ({ children }) => (
  // @TODO <DocumentTitle title={this.getPageTitle()}>
  <div className={styles.container}>
    <div className={styles.lang}>
      <SelectLang />
    </div>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>{app.name}</span>
          </Link>
        </div>
        <div className={styles.desc}>{app.description}</div>
      </div>
      {children}
    </div>
    <GlobalFooter links={links} copyright={copyright} />
  </div>
);

export default UserLayout;
