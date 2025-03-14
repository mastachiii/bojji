const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");
const { randomUUID } = require("node:crypto");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

function uploadFiles(req, res, next) {
    if (!req.files) return next();

    req.body.images = [];

    req.files.forEach((file, index) => {
        const fileUpload = decode(file.buffer.toString("base64"));
        const path = `${req.user.username}/${randomUUID()}.${file.originalname.split(".")[1]}`;

        supabase.storage.from("bojji").upload(path, fileUpload, {
            contentType: "image",
        });

        const { data } = supabase.storage.from("bojji").getPublicUrl(path);

        req.body.images.push(data.publicUrl);
    });

    next();
}

function uploadFile(req, res, next) {
    if (!req.file) return next();

    const fileUpload = decode(req.file.buffer.toString("base64"));
    const path = `${req.user.username}/${randomUUID()}.${req.file.originalname.split(".")[1]}`;

    supabase.storage.from("bojji").upload(path, fileUpload, {
        contentType: "image",
    });

    const { data } = supabase.storage.from("bojji").getPublicUrl(path);

    req.body[req.file.fieldname] = data.publicUrl;

    next();
}

module.exports = { uploadFiles, uploadFile };
