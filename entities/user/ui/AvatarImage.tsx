import type { Props } from "../model/types";

const AvatarImage = ({avatarUrl}: Props) => {
  return (
    <img
      src={avatarUrl}
      alt="аватар"
      onError={(e) =>
        ((e.target as HTMLImageElement).src =
          "src/shared/assets/images/user/avatar-default.svg")
      }
    />
  );
};

export default AvatarImage;
