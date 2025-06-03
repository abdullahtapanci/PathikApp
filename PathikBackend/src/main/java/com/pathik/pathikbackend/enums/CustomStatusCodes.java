package com.pathik.pathikbackend.enums;

public enum CustomStatusCodes {

    ERROR_VALIDATION("ERROR_1000", "Validation failed"),
    ERROR_LOGIN_USER("ERROR_2000", "User login failed"),
    ERROR_CREATE_USER("ERROR_3000", "User can not be created."),
    ERROR_DELETE_PATH("ERROR_4000", "Path can not be deleted."),
    ERROR_UPDATE_PATH("ERROR_5000", "Path can not be updated.");

    private final String code;
    private final String message;

    CustomStatusCodes(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() { return code; }
    public String getMessage() { return message; }

}
