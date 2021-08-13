import React from "react";

const range = (start: number, end: number) => {
  const length  = end - start + 1
  return new Array.from({
    length
  }, (_, idx) => length + idx) 
}