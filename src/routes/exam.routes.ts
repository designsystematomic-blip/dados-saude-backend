import { Router } from "express";
import { ExamController } from "../controllers/exam.controller";
import examUpload from "../service/multer-exam";

const examRoutes = Router();

examRoutes.post("/create", examUpload.array('files', 10), ExamController.createExamWithFiles);
examRoutes.get("/:id", ExamController.getExamById);

examRoutes.get("/user/:userId", ExamController.getUserExamsWithFiles);
examRoutes.get("/file/:fileId/download", ExamController.getFileDownloadUrl);
examRoutes.get("/file/:fileId/stream", ExamController.getFileStream);

examRoutes.get("/filter/name/:userId", ExamController.getFilterByExamName);
examRoutes.get("/filter/type/:userId", ExamController.getFilterByExamType);
examRoutes.get("/filter/specialty/:userId", ExamController.getFilterBySpecialty);

export default examRoutes;
