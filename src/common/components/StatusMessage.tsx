import React, { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { isErrorWithMessage, isFetchBaseQueryError } from "../helpers";

type Props = {
  isLoading: boolean;
  isFetching?: boolean;
  isError: FetchBaseQueryError | SerializedError | null | undefined;
};

function StatusMessage(props: Props) {
  const { isLoading, isFetching, isError } = props;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isFetchBaseQueryError(isError)) {
      // @ts-ignore
      setErrorMessage(isError.data.message);
    } else if (isErrorWithMessage(isError)) {
      setErrorMessage(isError.message);
    }
  }, [isError]);

  return isLoading || isFetching ? (
    <span className="d-inline-block m-2 my-sm-4 fs-4 fst-italic">
      Loading ...
    </span>
  ) : isError ? (
    <span className="d-inline-block my-3 my-sm-4 fs-4">
      <p>{errorMessage}</p>
      <p>Please reload the page and try again.</p>
    </span>
  ) : null;
}

export default StatusMessage;
