import React, { useMemo, useState } from "react";
import { useGetUserProfileQuery, useGetUserReposQuery } from "../api/gitHubApi";
import { useAppSelector } from "../../common/hooks";
import { UserRepo } from "../api/types";
import UserInfo from "./components/UserInfo";
import ReposSearch from "./components/ReposSearch";
import ReposList from "./components/ReposList";

const UserProfile: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const userName = useAppSelector((state) => state.currentUser.userLogin);

  const {
    data: user,
    error: userErr,
    isLoading: isUserLoading,
  } = useGetUserProfileQuery(userName, {
    skip: !userName,
  });

  const {
    data: repos = [],
    error: reposErr,
    isLoading: isReposLoading,
  } = useGetUserReposQuery(userName, { skip: !userName });

  const filteredList: UserRepo[] = useMemo(
    () =>
      repos.filter((repo) => {
        return repo.name.includes(searchValue);
      }),
    [searchValue, repos]
  );

  return (
    <section className="mt-4 mt-md-5">
      {isUserLoading ? (
        <span className="d-inline-block m-2 my-sm-4 fs-4 fst-italic">
          Loading ...
        </span>
      ) : userErr ? (
        <span className="d-inline-block my-3 my-sm-4 fs-4">
          Something went wrong... Please reload the page and try again.
        </span>
      ) : (
        user && (
          <>
            <h2 className="mb-4 mb-md-5">User Profile</h2>
            <section className="p-1 p-sm-2">
              <UserInfo user={user} />
              <section>
                <ReposSearch onInputChange={setSearchValue} />
                <ReposList
                  isLoading={isReposLoading}
                  isError={reposErr}
                  list={filteredList}
                />
              </section>
            </section>
          </>
        )
      )}
    </section>
  );
};

export default UserProfile;
