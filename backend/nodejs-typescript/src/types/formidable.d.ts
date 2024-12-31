declare namespace formidable {
  interface File {
    size: number;

    filepath: string;

    originalFilename: string | null;

    newFilename: string;

    mimetype: string | null;

    mtime?: Date | null | undefined;

    hashAlgorithm: false | "sha1" | "md5" | "sha256";

    hash?: string | null;

    toJSON(): import("formidable").FileJSON;

    toString(): string;
  }
}
