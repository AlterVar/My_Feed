import { Button, InputField } from "@/shared/ui";
import "./ProfileForm.scss";
import Radio from "./radio-btn/Radio";
import DateInput from "./date-input/DateInput";
import useEditUser from "../lib/useEditUser";
import Avatar from "./avatar/Avatar";
import { useState } from "react";
import CancelDialog from "./cancel-dialog/CancelDialog";

const ProfileForm = () => {
  const {
    editUser,
    cancelChange,
    register,
    control,
    handleSubmit,
    isDirty,
    errors,
    getValues,
    deleteAvatar,
    avatarImage,
    dirtyFields,
    newUserLoading,
  } = useEditUser();

  const [isOpenCancelDialog, setOpenCancelDialog] = useState(false);
  return (
    <>
      {isOpenCancelDialog && (
        <CancelDialog
          cancelChange={cancelChange}
          editUser={editUser}
          getValues={getValues}
          setOpenCancelDialog={setOpenCancelDialog}
        />
      )}
      <form className="profile-form" onSubmit={handleSubmit(editUser)}>
        <div className="profile-form__fields">
          <Avatar
            register={register}
            deleteAvatar={deleteAvatar}
            avatarImage={avatarImage}
          />
          <InputField
            label={"Имя"}
            type={"text"}
            name={"firstName"}
            placeholder={"Введите ваше имя"}
            register={register}
          />
          <InputField
            label={"Фамилия"}
            type={"text"}
            name={"lastName"}
            placeholder={"Введите вашу фамилию"}
            register={register}
          />
          <InputField
            label={"Отчество"}
            type={"text"}
            name={"middleName"}
            placeholder={"Введите ваше отчество"}
            register={register}
          />
          <DateInput control={control} name={"birthDate"} />
          <div className="input">
            <p className="input__label input__title">Выберите пол</p>
            <div className="radio-fields">
              <Radio
                label={"Мужской"}
                register={register}
                name={"gender"}
                value={"MALE"}
              />
              <Radio
                label={"Женский"}
                register={register}
                name={"gender"}
                value={"FEMALE"}
              />
            </div>
          </div>
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"Введите ваш email"}
            register={register}
            dirty={dirtyFields.email}
            validationError={errors?.email}
          />
          <InputField
            label={"Номер телефона"}
            type={"text"}
            name={"phone"}
            placeholder={"+79990000000"}
            register={register}
            dirty={dirtyFields.phone}
            validationError={errors?.phone}
          />
          <InputField
            label={"Страна"}
            type={"text"}
            name={"country"}
            placeholder={"Введите вашу страну"}
            register={register}
          />
        </div>
        <div className="profile-form__actions">
          <Button
            type={"button"}
            variant={"secondary"}
            size={"small"}
            text={"Отменить"}
            disabled={!isDirty || !!errors?.phone || !!errors?.email}
            onClick={() => setOpenCancelDialog(true)}
          />
          <Button
            type={"submit"}
            variant={"primary"}
            size={"small"}
            text={"Сохранить"}
            loading={newUserLoading}
            disabled={!isDirty || !!errors?.phone || !!errors?.email}
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
