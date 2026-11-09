
package com.example.sqldlab;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KnowledgeBaseController {

    @GetMapping("/knowledge")
    public String knowledgeBase() {
        return "knowledge_base";
    }
}
