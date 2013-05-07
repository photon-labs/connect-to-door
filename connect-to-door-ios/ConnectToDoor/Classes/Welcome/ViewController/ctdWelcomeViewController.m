//
//  ctdWelcomeViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdWelcomeViewController.h"
#import "ctdProfileViewController.h"
#import "ctdVoucherViewController.h"
#import "ctdDailyAttendaceViewController.h"

@interface ctdWelcomeViewController ()

@end

@implementation ctdWelcomeViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    self.title = @"Welcome";
}

-(void)viewWillAppear:(BOOL)animated{
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)didCheckInClicked:(id)sender{
    
}

- (IBAction)didCheckOutClicked:(id)sender{
    
}

- (IBAction)didProfileClicked:(id)sender{
    [self goToProfile];
}

- (IBAction)didVoucherClicked:(id)sender{
    [self goToVoucher];
}

- (IBAction)didDailyAttendanceClicked:(id)sender{
    [self goToDailyAttendance];
}

- (IBAction)didAttendanceListClicked:(id)sender{
    
}

- (IBAction)didSignOutClicked:(id)sender{
    
}

-(void) goToProfile{
    ctdProfileViewController *profileViewController = [[ctdProfileViewController alloc]initWithNibName:@"ctdProfileViewController" bundle:nil];
    [self.navigationController pushViewController:profileViewController animated:YES];
}

-(void) goToVoucher{
    ctdVoucherViewController *voucherViewController = [[ctdVoucherViewController alloc]initWithNibName:@"ctdVoucherViewController" bundle:nil];
    [self.navigationController pushViewController:voucherViewController animated:YES];
}

-(void) goToDailyAttendance{
    ctdDailyAttendaceViewController *dailyAttendanceViewController = [[ctdDailyAttendaceViewController alloc]initWithNibName:@"ctdDailyAttendaceViewController" bundle:nil];
    [self.navigationController pushViewController:dailyAttendanceViewController animated:YES];
}

-(void) goToAttendanceList{
    ///
    ///
    ///
}

@end
