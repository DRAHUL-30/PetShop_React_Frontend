import React from "react";
import { Card, Button } from "react-bootstrap";

export const Cards = ({
  id,
  img,
  name,
  age,
  location,
  breed,
  update,
  disabled,
  price
}) => {
  return (
    <div>
      <Card style={{ width: "22rem" }} className="my-4 rounded">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="text-secondary">Name:</h5>
            <h4 className="mx-2">{name}</h4>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="text-secondary">Breed:</h5>
            <h6 className="mx-2">{breed}</h6>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="text-secondary">Age:</h5>
            <h6 className="mx-2">{age}</h6>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <h5 className="text-secondary">Location:</h5>
            <h6 className="mx-2">{location}</h6>
          </div>
          <Button
            variant="primary"
            className="mt-2"
            onClick={() => update(id,price)}
            disabled={disabled}
          >
            {disabled ? "Bought" : "Buy"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
