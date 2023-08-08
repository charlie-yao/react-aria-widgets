import { NextPageContext } from 'next';

export interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="container is-max-desktop content">
      <h1 style={{ marginTop: '1rem' }}>A { statusCode } Error Occurred!</h1>
      <p>(Sorry!)</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
  };
};

export default Error;
