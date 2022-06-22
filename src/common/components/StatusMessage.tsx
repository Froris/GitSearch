import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

type Props = {
  isLoading: boolean;
  isFetching: boolean;
  isError: FetchBaseQueryError | SerializedError | undefined;
};

function StatusMessage(props: Props) {
  const { isLoading, isFetching, isError } = props;
  return isLoading || isFetching ? (
    <span className="d-inline-block m-2 my-sm-4 fs-4 fst-italic">
      Loading ...
    </span>
  ) : isError ? (
    <span className="d-inline-block my-3 my-sm-4 fs-4">
      <p>Something went wrong or API rate limit exceeded...</p>
      <p>Please reload the page and try again.</p>
    </span>
  ) : null;
}

export default StatusMessage;
