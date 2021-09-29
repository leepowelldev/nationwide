import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Layout } from '../components/Layout';

const NotFoundPage: VFC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="text-center">
        <p>Page not found</p>
        <Link to="/">
          <MuiLink component="span">Back to home</MuiLink>
        </Link>
      </div>
    </Layout>
  );
};

export { NotFoundPage };
