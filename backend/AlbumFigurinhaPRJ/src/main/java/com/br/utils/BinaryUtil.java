package com.br.utils;

import com.br.model.AlbumExport;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;

public class BinaryUtil {

    private static final String EXPORT_DIR = "export";
    private static final String EXPORT_FILE = EXPORT_DIR + "/album.bin";

    // exporta o álbum para arquivo binário
    public static void exportar(AlbumExport album) {
        new File(EXPORT_DIR).mkdirs();

        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream(EXPORT_FILE))) {
            oos.writeObject(album);
            System.out.println("Export realizado: " + EXPORT_FILE);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao exportar álbum", e);
        }
    }

    // importa o álbum do arquivo binário
    public static AlbumExport importar() {
        if (!Files.exists(Paths.get(EXPORT_FILE))) {
            throw new RuntimeException("Arquivo de export não encontrado: " + EXPORT_FILE);
        }

        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream(EXPORT_FILE))) {
            return (AlbumExport) ois.readObject();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao importar álbum", e);
        }
    }

    public static boolean exportExists() {
        return Files.exists(Paths.get(EXPORT_FILE));
    }
}