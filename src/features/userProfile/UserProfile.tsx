import React, { useMemo, useState } from "react";
import { useGetUserReposQuery } from "../api/gitHubApi";
import { useAppSelector } from "../../common/hooks";
import UserInfo from "./components/UserInfo";
import ReposSearch from "./components/ReposSearch";
import ReposList from "./components/ReposList";
import StatusMessage from "../../common/components/StatusMessage";
import { UserRepo } from "../api/types";

const UserProfile: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    currentUser,
    isLoading,
    error: userErr,
  } = useAppSelector((state) => state.user);

  const {
    data: repos = [],
    error: reposErr,
    isLoading: isReposLoading,
    isFetching: isReposFetching,
  } = useGetUserReposQuery(currentUser.login, {
    skip: !currentUser,
  });

  const filteredList: UserRepo[] = useMemo(
    () =>
      repos.filter((repo) => {
        return repo.name.includes(searchValue);
      }),
    [searchValue, repos]
  );

  return (
    <section className="mt-4 mt-md-5">
      <StatusMessage isLoading={isLoading} isError={userErr} />
      {currentUser.login && (
        <>
          <h2 className="mb-4 mb-md-5">User Profile</h2>
          <section className="p-1 p-sm-2">
            <UserInfo user={currentUser} />
            <section>
              <ReposSearch onInputChange={setSearchValue} />
              <ReposList
                isLoading={isReposLoading}
                isFetching={isReposFetching}
                isError={reposErr}
                list={filteredList}
              />
            </section>
          </section>
        </>
      )}
    </section>
  );
};

export default UserProfile;
