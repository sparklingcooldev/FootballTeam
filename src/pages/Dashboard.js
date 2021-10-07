
import AdminDashboard from "./AdminDashboard";
import TeamOwner from "./TeamOwner";
import LeagueManager from "./LeagueManager";
import { connect } from 'react-redux'

const Dashboard = ({ user }) => {
    return (

        <>
            {(localStorage.getItem('jwtToken') === "google" || user.level === "admin") && <AdminDashboard />}
            {user.level === "teamowner" && <TeamOwner />}
            {user.level === "leaguemanager" && <LeagueManager />}
        </>
    );

};
const fromStore = (store) => {
    return {
        user: store.FirstReducer.user,
    }
}

export default connect(fromStore, null)(Dashboard)