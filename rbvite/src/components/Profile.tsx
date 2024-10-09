import { ProfileProps } from "../types/props";

function Profile({ name, logout }: ProfileProps) {
  return (
    <>
      <span>{name} Logined</span>
      <div>
        <span onClick={logout}>Log Out</span>
      </div>
    </>
  );
}

export default Profile;
