import { ProfileForm } from "@/features/user/change-user-info";
import "./Profile.scss";
import { BackLink } from "@/shared/ui";

const Profile = () => {
  return (
    <div className="profile page-container">
      <div className="desktop-only">
        <BackLink text={"Главная"} path={"/"} />
      </div>
      <div className="content-container">
        <h1 className="profile__title desktop-only">Мой профиль</h1>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profile;
