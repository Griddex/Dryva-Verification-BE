import React from "react";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import { sendValuesToStoreAction } from "../actions/sendValuesToStoreAction";

const VerificationImagesForm = props => {
    const { saveFormValuesInStore } = props;

    const handleImagesSelected = imgs => {
        saveFormValuesInStore("Images", imgs);
    };

    return (
        <ImageUploader
            withIcon={true}
            buttonText="Choose images"
            onChange={handleImagesSelected}
            imgExtension={[".jpg", ".gif", ".png", "gif"]}
            maxFileSize={5242880}
            withPreview={true}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        saveFormValuesInStore: (name, value) =>
            dispatch(sendValuesToStoreAction(name, value))
    };
};

export default connect(null, mapDispatchToProps)(VerificationImagesForm);