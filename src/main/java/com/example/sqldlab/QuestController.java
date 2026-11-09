
package com.example.sqldlab;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QuestController {

    @GetMapping("/quests/first")
    public String firstQuest() {
        return "quest";
    }
}
