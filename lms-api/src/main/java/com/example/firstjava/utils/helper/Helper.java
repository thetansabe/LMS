package com.example.firstjava.utils.helper;

import java.util.UUID;

public class Helper {
    public static Long GenerateLongUID(){
        return UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
    }
}
