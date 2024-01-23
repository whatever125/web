package org.whatever125.springbackend.model;

public enum Role {
    ROLE_USER (Constants.ROLE_USER_VALUE),
    ROLE_ADMIN (Constants.ROLE_ADMIN_VALUE);

    private final String value;

    Role(String value) {
        this.value = value;
    }

    public String toString() {
        return this.value;
    }

    public static class Constants {
        public static final String ROLE_USER_VALUE = "ROLE_USER";
        public static final String ROLE_ADMIN_VALUE = "ROLE_ADMIN";
    }
}
