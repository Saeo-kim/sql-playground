
package com.example.sqldlab;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudyCanvasController {

    @GetMapping("/study-canvas")
    public String studyCanvas() {
        return "study_canvas";
    }
}
