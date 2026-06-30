package main

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/lipgloss"
)

// Constants
const (
	maxWidth = 90
	// Colors
	primaryColor   = lipgloss.Color("6")  // Muted Cyan/Teal
	secondaryColor = lipgloss.Color("3")  // Soft Yellow/Gold
	textColor      = lipgloss.Color("15") // Near White
	subtleColor    = lipgloss.Color("8")  // Soft Gray
	accentColor    = lipgloss.Color("5")  // Muted Magenta/Purple
)

// --- STYLES ---

var (
	// Base container style
	containerStyle = lipgloss.NewStyle().
		MaxWidth(maxWidth).
		Padding(0, 2)

	// Header styles
	headerStyle = lipgloss.NewStyle().
		MarginBottom(1)
	nameStyle = lipgloss.NewStyle().
		Foreground(primaryColor).
		Bold(true).
		Render
	subtitleStyle = lipgloss.NewStyle().
		Foreground(subtleColor).
		Render

	// Footer styles
	footerStyle = lipgloss.NewStyle().
		Foreground(subtleColor).
		MarginTop(1).
		PaddingTop(1).
		BorderTop(true).
		BorderForeground(subtleColor)
	linkStyle = lipgloss.NewStyle().
		Foreground(primaryColor).
		Underline(true).
		Render

	// Content panel styles
	panelStyle = lipgloss.NewStyle().
		Border(lipgloss.RoundedBorder()).
		BorderForeground(subtleColor).
		Padding(1, 2).
		BorderBottom(true).
		BorderRight(true)

	panelTitleStyle = lipgloss.NewStyle().
		Foreground(secondaryColor).
		Bold(true).
		MarginBottom(1).
		Render

	// Text styles
	textStyle = lipgloss.NewStyle().
		Foreground(textColor)
	listItemStyle = lipgloss.NewStyle().
		MarginBottom(1)
	itemHeaderStyle = lipgloss.NewStyle().
		Foreground(textColor).
		Bold(true).
		Render
	itemMetaStyle = lipgloss.NewStyle().
		Foreground(subtleColor).
		Render
	tagStyle = lipgloss.NewStyle().
		Foreground(accentColor).
		Render
)

// --- CONTENT ---

// Section represents a panel in the UI
type Section struct {
	Title   string
	Content string
}

// --- UI BUILDERS ---

func buildHeader() string {
	name := nameStyle("Shubhankar Gupta")
	subtitle := subtitleStyle("Backend & Systems Engineer · Building for Scale")
	return headerStyle.Render(fmt.Sprintf("%s\n%s", name, subtitle))
}

func buildFooter() string {
	gh := linkStyle("GitHub")
	web := linkStyle("Website")
	return footerStyle.Render(fmt.Sprintf("Find me on %s or visit my %s.", gh, web))
}

func buildPanel(title, content string, width int) string {
	return panelStyle.Copy().Width(width).Render(fmt.Sprintf("%s\n%s", panelTitleStyle(title), content))
}

func buildListItem(header, meta, body string, tags []string) string {
	headerPart := itemHeaderStyle(header)
	metaPart := itemMetaStyle(meta)
	bodyPart := textStyle.Copy().Margin(0, 0, 1, 2).Render(body)
	tagsPart := ""
	if len(tags) > 0 {
		tagsPart = textStyle.Copy().Margin(0, 0, 0, 2).Render(tagStyle(strings.Join(tags, " · ")))
	}

	return listItemStyle.Render(
		fmt.Sprintf("%s %s\n%s%s", headerPart, metaPart, bodyPart, tagsPart),
	)
}

func main() {
	// --- DEFINE CONTENT SECTIONS ---
	leftPanelWidth := 38
	rightPanelWidth := 48

	// Left Column
	stackContent := strings.Join([]string{
		buildListItem("Languages", "", "Go, Python, SQL, TypeScript", []string{}),
		buildListItem("Core Stack", "", "FastAPI, Django, PostgreSQL, Redis, Celery, Docker", []string{}),
		buildListItem("Databases", "", "PostgreSQL (PostGIS, pgvector), Redis, ClickHouse", []string{}),
	}, "\n")

	philosophyContent := strings.Join([]string{
		buildListItem("Pragmatism", "", "Choosing the right tool for the job, not just the newest.", []string{}),
		buildListItem("Durability", "", "Building systems that are easy to understand, test, and maintain.", []string{}),
		buildListItem("Automation", "", "If it can be automated, it should be. From tests to infra.", []string{}),
	}, "\n")

	leftColumn := []Section{
		{Title: "Stack & Tools", Content: stackContent},
		{Title: "Philosophy", Content: philosophyContent},
	}

	// Right Column
	projectsContent := strings.Join([]string{
		buildListItem("TrustSystem", "Patent-backed Identity Verification", "Fraud detection using pgvector and Sentence Transformers.", []string{"Django", "PostgreSQL", "Redis"}),
		buildListItem("StandardStitch", "Multi-tenant Commerce Platform", "Enterprise backend with PostGIS for spatial queries.", []string{"40+ APIs", "Django", "PostGIS"}),
		buildListItem("MemeTrends", "Real-time Analytics Engine", "Redis-based leaderboards with time-decay algorithms.", []string{"O(log N)", "Django", "Redis"}),
	}, "\n\n")

	experienceContent := strings.Join([]string{
		buildListItem("Backend Developer", "Freelance (Oct 2025 – Present)", "Full ownership from architecture to deployment.", []string{"REST APIs", "Automated Testing", "PostGIS", "Celery"}),
		buildListItem("Python Developer", "EverythingAboutAI (Jul – Aug 2025)", "Developed FastAPI microservices and automation pipelines.", []string{"FastAPI", "Make.com"}),
	}, "\n\n")

	rightColumn := []Section{
		{Title: "Featured Projects", Content: projectsContent},
		{Title: "Experience", Content: experienceContent},
	}

	// --- RENDER ---
	var leftBlock, rightBlock []string
	for _, s := range leftColumn {
		leftBlock = append(leftBlock, buildPanel(s.Title, s.Content, leftPanelWidth))
	}
	for _, s := range rightColumn {
		rightBlock = append(rightBlock, buildPanel(s.Title, s.Content, rightPanelWidth))
	}

	mainContent := lipgloss.JoinHorizontal(
		lipgloss.Top,
		lipgloss.JoinVertical(lipgloss.Top, leftBlock...),
		lipgloss.JoinVertical(lipgloss.Top, rightBlock...),
	)

	// Final assembly
	ui := containerStyle.Render(
		lipgloss.JoinVertical(
			lipgloss.Left,
			buildHeader(),
			mainContent,
			buildFooter(),
		),
	)

	fmt.Println(ui)
}