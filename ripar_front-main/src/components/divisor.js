import Card from 'react-bootstrap/Card';

function Divisor({children, className}) {

  return (
    <Card className={className}>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}

export {Divisor};
