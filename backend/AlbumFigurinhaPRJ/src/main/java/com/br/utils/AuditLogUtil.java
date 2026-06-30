package com.br.utils;

import java.io.FileWriter;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AuditLogUtil {

    private static final String LOG_FILE = "logs/audit.log";
    private static final DateTimeFormatter FORMATTER = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void log(String usuario, String acao) {
        // cria a pasta logs se não existir
        new java.io.File("logs").mkdirs();

        String linha = String.format("[%s] | %-20s | %s",
                LocalDateTime.now().format(FORMATTER), usuario, acao);

        // imprime no console
        System.out.println("AUDIT: " + linha);

        // grava no arquivo (append = true para não sobrescrever)
        try (PrintWriter pw = new PrintWriter(new FileWriter(LOG_FILE, true))) {
            pw.println(linha);
        } catch (Exception e) {
            System.err.println("Erro ao gravar log: " + e.getMessage());
        }
    }
}