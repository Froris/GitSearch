import React, { useMemo, useState } from "react";
import { useGetUserProfileQuery, useGetUserReposQuery } from "../api/gitHubApi";
import { useAppSelector } from "../../common/hooks";
import { UserRepo } from "../api/types";
import UserInfo from "./components/UserInfo";
import ReposSearch from "./components/ReposSearch";
import ReposList from "./components/ReposList";
import StatusMessage from "../../common/components/StatusMessage";

const UserProfile: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const userName = useAppSelector((state) => state.currentUser.userLogin);

  const {
    data: user,
    error: userErr,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetUserProfileQuery(userName, {
    skip: !userName,
  });

  const {
    data: repos = [],
    error: reposErr,
    isLoading: isReposLoading,
    isFetching: isReposFetching,
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
      <StatusMessage
        isLoading={isUserLoading}
        isFetching={isUserFetching}
        isError={userErr}
      />
      {user && (
        <>
          <h2 className="mb-4 mb-md-5">User Profile</h2>
          <section className="p-1 p-sm-2">
            <UserInfo user={user} />
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
