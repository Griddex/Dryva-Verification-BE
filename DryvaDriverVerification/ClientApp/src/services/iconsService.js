import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import EmailIcon from "@material-ui/icons/Email";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const icons = {
    [`/Auth/register`]: <PersonAddIcon fontSize={"default"} />,
    [`/Auth/roles_and_permissions`]: <PersonPinCircleIcon fontSize={"default"} />,
    [`/Auth/officers_management`]: <RecentActorsIcon fontSize={"default"} />,
    [`/Auth/settings`]: <EmailIcon fontSize={"default"} />,
    [`/Auth/DriversList`]: <LibraryBooksIcon fontSize={"default"} />,
    [`/Auth/verification`]: <VerifiedUserIcon fontSize={"default"} />
};

const iconsService = icon => {
    return icons[icon];
};

export default iconsService;