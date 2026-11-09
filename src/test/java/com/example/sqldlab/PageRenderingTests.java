package com.example.sqldlab;

import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
class PageRenderingTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc() {
        return MockMvcBuilders.webAppContextSetup(context).build();
    }

    @ParameterizedTest
    @ValueSource(strings = {"/", "/knowledge", "/quests/first", "/study-canvas", "/about", "/prison"})
    void everyPageRendersTheSharedHeaderWithTheNewBrand(String path) throws Exception {
        mvc().perform(get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(allOf(
                        containsString("class=\"pg-header\""),
                        containsString("id=\"siteSearch\""),
                        containsString("class=\"pg-account\""),
                        not(containsString("SQLD Lab")),
                        not(containsString("href=\"/tutor\"")))));
    }

    @Test
    void homeLinksEachLearningCategoryToAnExistingPage() throws Exception {
        mvc().perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(allOf(
                        containsString("Start Learning"),
                        containsString("id=\"languageButton\""),
                        containsString("href=\"/prison#prisons\""),
                        containsString("href=\"/prison#monsters\""),
                        containsString("href=\"/prison#incidents\""),
                        containsString("href=\"/knowledge?concept=ORDER%20BY\""),
                        containsString("href=\"/quests/first\""))));
    }

    @ParameterizedTest
    @ValueSource(strings = {"/css/playground.css", "/js/playground.js"})
    void sharedAssetsAreServed(String path) throws Exception {
        mvc().perform(get(path)).andExpect(status().isOk());
    }
}
