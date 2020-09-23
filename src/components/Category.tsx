import * as React from "react";
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTint, faClock, faQuoteRight } from "@fortawesome/free-solid-svg-icons"

import { CategoryProps } from "../types";

const Category: React.FC<CategoryProps> = ({ todos, title, sort }) => {

  const [sorterIndex, setSorterIndex] = useState(sort);

  const sorters = [
    (a: any, b: any) => { // color sorter
      return (a.props.todo.color.localeCompare(b.props.todo.color));
    },
    (a: any, b: any) => { // date sorter
      let dateA = new Date(a.props.todo.date + " " + a.props.todo.time);
      let dateB = new Date(b.props.todo.date + " " + b.props.todo.time);
      return dateA.getTime() - dateB.getTime();
    },
    (a: any, b: any) => { // body sorter
      return (a.props.todo.body.localeCompare(b.props.todo.body));
    },
  ];

  const cycleSorter = () => {
    setSorterIndex((sorterIndex + 1) % sorters.length);
  }

  const renderCycleButton = () => {
    const icons = [
      <FontAwesomeIcon icon={faTint} onClick={cycleSorter} />,
      <FontAwesomeIcon icon={faClock} onClick={cycleSorter} />,
      <FontAwesomeIcon icon={faQuoteRight} onClick={cycleSorter} />
    ];
    return (
      <div>
        {icons[sorterIndex]}
      </div>
    )
  }

  if (todos.length > 0) {
    return (
      <div className="category-container">
        <div className="category-header">
          <h1 className="category-heading">{title}</h1>
          {renderCycleButton()}
        </div>
        {[...todos].sort(sorters[sorterIndex])}

      </div>
    )
  } else {
    return null;
  }
}

export default Category;
