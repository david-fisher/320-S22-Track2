package com.clog.Clog;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.aspectj.lang.annotation.Before;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.hamcrest.Matchers.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;
import java.util.Optional;

import com.clog.Clog.LogDetailFiles.LogDetail;
import com.clog.Clog.LogDetailFiles.LogDetailRepository;
import com.clog.Clog.LogEventFiles.LogEvent;
import com.clog.Clog.LogEventFiles.LogEventFilterSpecification;
import com.clog.Clog.LogEventFiles.LogEventRepository;
import com.clog.Clog.LogEventFiles.LogEventsSearchCriteria;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.jayway.jsonpath.JsonPath;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@TestExecutionListeners({ DependencyInjectionTestExecutionListener.class,
        DbUnitTestExecutionListener.class })
@AutoConfigureMockMvc
public class LogEventRepositoryTests {
    @Autowired
    private MockMvc mockMvc;

    // Severity and Priorities are not drop-downs. Start and end-time, returns
    // Nothing.
    @Test
    @DatabaseSetup("sample_data.xml")
    public void testSearchByBusinessDomain() throws Exception {
        this.mockMvc.perform(get("/logEvents").param("businessDomain", "CRM"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @DatabaseSetup("sample_data.xml")
    public void testSampleQuerysuccess() throws Exception {
        this.mockMvc.perform(
                get("/logEvents")
                        .param("businessDomain", "CRM")
                        .param("eaiDomain", "EAI_DOMAIN_1")
                        .param("startTime", "2020-12-12 01:24:23")
                        .param("endTime", "2020-12-12 01:25:00")
                        .param("businessSubDomain", "Customer")
                        .param("process", "1212")
                        .param("priority", "10")
                        .param("categories", "ReportSituation")
                        .param("severities", "10")
                        .param("application", "CRM_adapter"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DatabaseSetup("sample_data.xml")
    public void testGetById() throws Exception {
        this.mockMvc.perform(
                get("/logDetail")
                        .param("id", "crm_server_000001"))
                .andExpect(status().isOk());
    }
}
