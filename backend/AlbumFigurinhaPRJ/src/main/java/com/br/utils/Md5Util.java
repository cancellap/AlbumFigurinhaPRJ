package com.br.utils;

import java.security.MessageDigest;
import java.util.HexFormat;

public class Md5Util {

    public static String calcular(byte[] dados) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(dados);
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao calcular MD5", e);
        }
    }
}