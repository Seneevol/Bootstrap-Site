// Import de Multer
const multer = require('multer')

// Ici nous définissons la config de stockage de multer
const storage = multer.diskStorage({
    // Ici la destination (ou seront stocker nos fichiers par default)
    destination: (req, files, cb) => {
        cb(null, './public/upload/users')
    },
    // Ici est définit le format du nom de l'image à stocker
    filename: (req, files, cb) => {
        const ext = files.originalname,
            date = Date.now(),
            completed = date + '_' + ext;

        files.completed = completed

        cb(null, completed)
    }
})

// Ici seront initialiser les parametre de la config de multer
const upload = multer({
    // Ici nous renseignons le stockage definit au dessu
    storage: storage,
    // Ici seront renseigner les limits des fichiers (taile, proportion, ...)
    limits: {
        fileSize: 1 * 4098 * 4098,
    },
    // Ici nous avons un filtre qui va nous permetre de configurer les extensions accepter par notre middleware ou autre
    fileFilter: (req, files, cb) => {
        if (
            files.mimetype === "image/png" ||
            files.mimetype === "image/jpg" ||
            files.mimetype === "image/gif" ||
            files.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            cb(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
        }
    }
})

// Ici nous exportons upload afin de pouvoir l'appeler dans notre router
module.exports = upload