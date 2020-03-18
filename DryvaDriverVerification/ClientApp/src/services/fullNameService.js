export const fullNameService = nameObject => {
    if (nameObject.middleName !== "") {
        return (
            nameObject.firstName +
            " " +
            nameObject.middleName +
            " " +
            nameObject.lastName
        );
    } else {
        return nameObject.firstName + " " + nameObject.lastName;
    }
};