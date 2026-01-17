import { Button } from '@/shared/ui';
import Delete from "@/shared/assets/images/post/delete.svg?react";
import useDeletePostRequest from '../lib/useDeletePostRequest';
import type { Props } from '../model/types';

const DeletePost = ({ id, mediaUrl }: Props) => {
  const { deletePost } = useDeletePostRequest();
  return (
    <Button
      type={"button"}
      variant={"icon"}
      icon={<Delete className='icon_secondary' />}
      text={""}
      onClick={() => deletePost(id, mediaUrl)}
    />
  );
};

export default DeletePost