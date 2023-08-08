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

//@ts-ignore
Error.getInitialProps = ({ res, err }) => {
  console.log(res, err); //eslint-disable-line
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
  };
};

export default Error;
