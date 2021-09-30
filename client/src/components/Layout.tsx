import { Container, LinearProgress } from '@mui/material';
import { Helmet } from 'react-helmet';
import logo from '../logo.svg';
import { LinearProgressPlaceholder } from './LinearProgressPlaceholder';
import type { FC } from 'react';

type Props = {
  showGlobalLoading?: boolean;
};

const Layout: FC<Props> = ({ children, showGlobalLoading = false }) => (
  <>
    {/* Global loading */}
    {showGlobalLoading ? <LinearProgress /> : <LinearProgressPlaceholder />}
    <Helmet titleTemplate="Nationwide - %s" />
    <Container className="py-5">
      <img alt="logo" className="logo" src={logo} />
      <main className="pt-10">{children}</main>
    </Container>
  </>
);

export { Layout };
export type { Props as LayoutProps };
