import { Button } from "@/shared/ui";
import Share from "@/shared/assets/images/post/share.svg?react";
import { useNavigate } from "react-router-dom";
import type { Props } from "../../model/types";

const ShareBtn = ({ openDialog, id }: Props) => {
	const navigate = useNavigate();
	const openShareDialog = () => {
		navigate(`${location.pathname}?id=${id}`)
		openDialog("share");
	}
  return (
    <Button
      type={"button"}
      variant={"icon"}
      icon={<Share className="icon_secondary"/>}
      text={""}
      onClick={openShareDialog}
    />
  );
};

export default ShareBtn;
