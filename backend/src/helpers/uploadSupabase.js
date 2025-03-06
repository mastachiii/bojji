const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");
const { randomUUID } = require("node:crypto");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

function uploadFiles(req, res, next) {
    if (!req.files) next();

    Object.keys(req.files).forEach(key => {
        const file = req.files[key][0];

        const fileUpload = decode(file.buffer.toString("base64"));
        const path = `${req.user.username}/${randomUUID()}`;

        supabase.storage.from("luna").upload(path, fileUpload, {
            contentType: "image",
        });

        const { data } = supabase.storage.from("bojji").getPublicUrl(path);

        req.body[file.fieldName] = data.publicUrl;
    });

    next();
}

module.exports = uploadFiles;
