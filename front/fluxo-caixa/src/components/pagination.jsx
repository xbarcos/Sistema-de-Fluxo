import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import "../stylesheets/pagination.css";

const MAX_ITEMS = 2;
const MAX_LEFT_ITENS = 4;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const firstPage = Math.max(current - MAX_LEFT_ITENS, 1);
  return (
    <ul className="pagination-buttons">
      <Flex flexDirection={"row"}>
        {Array.from({ length: MAX_ITEMS })
          .map((_, index) => index + firstPage)
          .map((page, key) => (
            <li key={key}>
              <Button margin={3} onClick={() => setOffset((page - 1) * limit)}>
                {page}
              </Button>
            </li>
          ))}
      </Flex>
    </ul>
  );
};
export default Pagination;
