import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const formatDate: (date: string) => string = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}
