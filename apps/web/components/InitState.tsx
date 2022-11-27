import { useOrganizationTeams } from "@app/hooks/useOrganizationTeams";
import { useTeamInvitations } from "@app/hooks/useTeamInvitations";
import { useTeamTasks } from "@app/hooks/useTeamTasks";
import { useTimer } from "@app/hooks/useTimer";
import { userState } from "@app/stores";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export function AppState() {
  const user = useRecoilValue(userState);

  return <>{user && <InitState />}</>;
}

function InitState() {
  const { loadTeamsData, firstLoadTeamsData } = useOrganizationTeams();
  const { firstLoadTasksData } = useTeamTasks();
  const { firstLoadTeamInvitationsData } = useTeamInvitations();
  const { getTimerStatus, firstLoadTimerData } = useTimer();

  useEffect(() => {
    //To be called once, at the top level component (e.g main.tsx);
    firstLoadTeamsData();
    firstLoadTasksData();
    firstLoadTeamInvitationsData();
    firstLoadTimerData();
    // --------------

    getTimerStatus();
    loadTeamsData();
  }, [
    firstLoadTasksData,
    firstLoadTeamInvitationsData,
    firstLoadTeamsData,
    loadTeamsData,
    getTimerStatus,
    firstLoadTimerData,
  ]);
  return <></>;
}