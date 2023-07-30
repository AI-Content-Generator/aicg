import { Card, Container } from 'react-bootstrap';

export default function Editor({result, onChange, waiting}) {
  const fileUrl = result

  return (
    <div className="max-h-[25vh] overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      <h3 className="font-semibold text-gray-500 mb-2">Content</h3>
      <Container className = "output-container ">
        <Card className = "output-card"
          key='output-card'
          onChange={onChange}
          readOnly={waiting}>
          <Card.Body>
            <Card.Text className = { `${waiting ? "output-text-can-edit" : "output-text-read-only"}` }>
              {result}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}